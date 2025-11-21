import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Layout, Calendar, Badge, List, Spin, Alert, Modal, Button, ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import getConfig from 'next/config'; 

const { Content } = Layout;

type Agendamento = {
	id: number;
	data: string; // ISO date
	status: 'PENDENTE' | 'APROVADO' | 'NEGADO';
	cliente?: { id: string; name?: string; email?: string };
	nomeClienteManual?: string;
};

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

export default function CalendarPage() {
	const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [calendarValue, setCalendarValue] = useState<any>(undefined);
	const [calendarMode, setCalendarMode] = useState<'month' | 'year' | undefined>(undefined);
	const [userName, setUserName] = useState<string | null>(null);
	const suppressNextSelectRef = React.useRef(false);

	// Get logged-in user's name from sessionStorage
	useEffect(() => {
		try {
			const userStr = sessionStorage.getItem('user');
			if (userStr) {
				const user = JSON.parse(userStr);
				setUserName(user.name || null);
			}
		} catch {}
	}, []);

	function ensureDayLike(d: any) {
		if (!d) return d;
		if (typeof d.year === 'function') return d;
		const dt = typeof d.toDate === 'function' ? d.toDate() : (d instanceof Date ? d : new Date(d));
		return {
			year: () => dt.getFullYear(),
			month: () => dt.getMonth(),
			date: () => dt.getDate(),
			toDate: () => dt,
			format: (fmt: string) => {
				const pad = (n: number) => String(n).padStart(2, '0');
				if (fmt === 'YYYY-MM-DD') return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
				if (fmt === 'MMM') return dt.toLocaleString('pt-BR', { month: 'short' });
				return dt.toString();
			}
		};
	}

	useEffect(() => {
		fetchAgendamentos();
	}, []);

	async function fetchAgendamentos() {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_URL}/agendamentos/calendar`);
			if (!res.ok) throw new Error(`Erro: ${res.status}`);
			const data: Agendamento[] = await res.json();
			const normalized = data.map(a => ({ ...a, data: a.data.split('T')[0] }));
			setAgendamentos(normalized);
		} catch (err) {
			console.error(err);
			setError('Falha ao carregar agendamentos.');
		} finally {
			setLoading(false);
		}
	}

	// AntD cellRender
	function cellRender(date: any, info: any) {
		// helper for year/month/day 
		const getYear = (d: any) => {
			if (!d) return new Date().getFullYear();
			if (typeof d.year === 'function') return d.year();
			if (typeof d.getFullYear === 'function') return d.getFullYear();
			if (typeof d.toDate === 'function') return d.toDate().getFullYear();
			return new Date(d).getFullYear();
		};
		const getMonth = (d: any) => {
			if (!d) return new Date().getMonth();
			if (typeof d.month === 'function') return d.month();
			if (typeof d.getMonth === 'function') return d.getMonth();
			if (typeof d.toDate === 'function') return d.toDate().getMonth();
			return new Date(d).getMonth();
		};
		const getDay = (d: any) => {
			if (!d) return new Date().getDate();
			if (typeof d.date === 'function') return d.date();
			if (typeof d.getDate === 'function') return d.getDate();
			if (typeof d.toDate === 'function') return d.toDate().getDate();
			return new Date(d).getDate();
		};

			if (info && info.type === 'month') {
				// counter de agendamentos pendentes e aprovados no mês
				const year = getYear(date);
				const month = getMonth(date);

				const count = agendamentos.reduce((acc, a) => {
					const d = new Date(a.data);
					if (d.getFullYear() === year && d.getMonth() === month && (a.status === 'PENDENTE' || a.status === 'APROVADO')) return acc + 1;
					return acc;
				}, 0);

				return (
					<div style={{ padding: 8, textAlign: 'center', cursor: 'pointer' }}
						onClick={() => {
							suppressNextSelectRef.current = true;
							setCalendarValue(ensureDayLike(date));
							setCalendarMode('month');
						}}
					>
						<div style={{ marginTop: 6 }}>{count} agendamento{count === 1 ? '' : 's'}</div>
					</div>
				);
			}

			// day cell
			const year = getYear(date);
			const month = getMonth(date);
			const day = getDay(date);
			const pad = (n: number) => String(n).padStart(2, '0');
			const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
			const list = agendamentos.filter(a => a.data.startsWith(dateStr));
			return (
						<ul className="events">
								{list.map(item => {
									const displayName = item.cliente?.name || item.nomeClienteManual || 'Cliente';
									return (
										<li key={item.id}>
											<Badge status={item.status === 'APROVADO' ? 'success' : item.status === 'PENDENTE' ? 'processing' : 'default'} text={`${displayName} - ${item.status}`} />
										</li>
									);
								})}
						</ul>
			);
		}



	const selectedList = agendamentos.filter(a => selectedDate && a.data.startsWith(selectedDate));

	function openForDate(dateStr: string) {
		setSelectedDate(dateStr);
		setModalOpen(true);
	}

	// parse pra data local
	function ymdToLocalDate(ymd: string | null) {
		if (!ymd) return null;
		const parts = ymd.split('-').map(Number);
		if (parts.length !== 3) return new Date(ymd);
		return new Date(parts[0], parts[1] - 1, parts[2]);
	}

	function handleSelect(d: any) {
		if (suppressNextSelectRef.current) {
			suppressNextSelectRef.current = false;
			return;
		}
		// modal switch do month mode pra year mode
		if (calendarMode === 'month' || calendarMode === undefined) {
			const ds = ensureDayLike(d).format('YYYY-MM-DD');
			openForDate(ds);
		}
	}

	function handleEventClick(item: Agendamento) {
		const dateStr = item.data.split('T')[0];
		setSelectedDate(dateStr);
		setModalOpen(true);
	}

	return (
		<>
			<Head>
				<title>Calendário</title>
			</Head>
			<Content className="content">
				<div className="page-container">
					<h1>Agendamentos - Calendário</h1>
					{loading && <Spin />}
					{error && <Alert type="error" message={error} />}

					<div style={{ display: 'flex', gap: 24 }}>
						<div style={{ flex: 1 }}>
							<ConfigProvider locale={ptBR}>
												<div className="calendar-wrapper">
																				<Calendar
																					cellRender={cellRender}
																					onSelect={handleSelect}
																					value={calendarValue}
																					mode={calendarMode}
																					onPanelChange={(v: any, m: any) => {
																					setCalendarValue(v);
																					setCalendarMode(m);
																					}}
																				/>
												</div>
							</ConfigProvider>
						</div>
					</div>

					<Modal
						title={selectedDate ? new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(ymdToLocalDate(selectedDate) as Date) : 'Eventos'}
						open={modalOpen}
						centered
						onCancel={() => setModalOpen(false)}
						footer={[
							<Button key="close" onClick={() => setModalOpen(false)}>Fechar</Button>
						]}
					>
						{selectedList.length === 0 ? (
							<p>Nenhum agendamento neste dia.</p>
						) : (
							<List
								dataSource={selectedList}
								renderItem={item => (
									<List.Item key={item.id} onClick={() => handleEventClick(item)} style={{ cursor: 'pointer' }}>
										<List.Item.Meta
											title={`${item.cliente?.name || item.nomeClienteManual || 'Cliente'} - ${item.status}`}
											description={`Data: ${item.data}`}
										/>
									</List.Item>
								)}
							/>
						)}
					</Modal>
				</div>
			</Content>
		</>
	);
}


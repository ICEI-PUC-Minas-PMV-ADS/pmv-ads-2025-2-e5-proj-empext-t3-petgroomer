using Microsoft.AspNetCore.Mvc;
using ApiFotos.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace ApiFotos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FotosController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;

        
        private static List<Foto> _fotos = new List<Foto>();

        public FotosController()
        {
            // Config do Cloudinary
            var account = new Account(
                "dzgbrk7nk",      // Cloud Name
                "189527879195775", // API Key
                "klaQhuTPC090G_DK137hA8PUZKQ" // API Secret
            );
            _cloudinary = new Cloudinary(account);
        }

        
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { erro = "Nenhum arquivo enviado." });

            try
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream())
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult?.SecureUrl == null)
                    return StatusCode(500, new
                    {
                        erro = "Falha ao enviar a imagem para o Cloudinary.",
                        detalhes = uploadResult?.Error?.Message ?? "UploadResult nulo"
                    });

                var foto = new Foto
                {
                    NomeArquivo = file.FileName,
                    Url = uploadResult.SecureUrl.ToString(),
                    DataUpload = DateTime.UtcNow
                };

                _fotos.Add(foto);

                return Ok(foto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    erro = "Erro ao enviar a imagem.",
                    detalhes = ex.Message
                });
            }
        }

        
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_fotos.OrderByDescending(f => f.DataUpload).ToList());
        }
    }
}

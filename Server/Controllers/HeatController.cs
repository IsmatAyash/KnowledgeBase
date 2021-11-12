using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeatController : ControllerBase
    {
        private readonly HeatContext hctx;

        public HeatController(HeatContext heatctx)
        {
            hctx = heatctx;
        }

        // GET: api/Heat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Knowledge>>> GetKnowledge()
        {
            var knowledge =
                await hctx.Knowledges
                      .AsNoTracking()
                      .Where(p => p.Status == "Published")
                      .ToListAsync<Knowledge>();
            if (knowledge == null)
            {
                return NoContent();
            }

            return Ok(knowledge);
        }

        // GET: api/Heat/GetCategory
        [HttpGet("{id}")]
        public ActionResult<Attachment> GetKnowledge(string id)
        {
            var attachment = hctx.Attachments.FirstOrDefault(k => k._id == id);
            attachment.Mime = mimeType(attachment.FileType);
            if (attachment == null)
            {
                return NotFound();
            }
            return Ok(attachment);
        }


        // DownloadFile: api/Heat/{RecId}
        [Route("[action]/{id}")]
        [HttpGet]
        public ActionResult DownLoadFile(string id)
        {
            var attachment = hctx.Attachments.FirstOrDefault(k => k._id == id);
            if (attachment == null)
            {
                return NotFound();
            }

            return new FileContentResult(attachment.Base64Data, mimeType(attachment.FileType));
            //return File(attachment.AttachmentData, mimeType(attachment.AttachmentData_FileType), attachment.AttachmentData_FileName);
        }

        private string mimeType(string mime)
        {
            switch (mime)
            {
                case ".pdf":
                    return "application/pdf";
                case ".xls":
                    return "application/vnd.ms-excel";
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case ".xlsm":
                    return "application/vnd.ms-excel.sheet.macroEnabled.12";
                case ".xltm":
                    return "application/vnd.ms-excel.template.macroEnabled.12";
                case ".pptx":
                    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                case ".msg":
                    return "application/vnd.ms-outlook";
                case ".doc":
                    return "application/msword";
                case ".docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case ".vsdx":
                    return "application/vnd.visio";
                default:
                    return "text/plain";
            }
        }
    }
}
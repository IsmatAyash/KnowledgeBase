using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KnowledgeBaseAPI.Models
{
    public class Attachment
    {
        [Key]
        [Column("RecId")]
        public string _id { get; set; }
        public string Title { get; set; }
        [Column("AttachmentData_FileType")]
        public string FileType { get; set; }
        [Column("AttachmentData_FileName")]
        public string Mime { get; set; }
        [Column("AttachmentData")]
        public byte[] Base64Data { get; set; }
        public string Details { get; set; }

    }
}

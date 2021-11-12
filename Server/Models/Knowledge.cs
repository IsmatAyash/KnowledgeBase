using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace KnowledgeBaseAPI.Models
{
    public class Knowledge
    {
        [Key]
        [Column("RecId")]
        public string _id { get; set; }
        public string Status { get; set; }
        public string Keywords { get; set; }
        public string Title { get; set; }
        [Column("Level1")]
        public string RelatedText1 { get; set; }
        [Column("Level1")]
        public string RelatedText2 { get; set; }
        [Column("AttachmentData_FileType")]
        public string FileType { get; set; }
    }
}

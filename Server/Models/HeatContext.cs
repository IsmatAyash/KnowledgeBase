using Microsoft.EntityFrameworkCore;

namespace KnowledgeBaseAPI.Models
{
    public class HeatContext : DbContext
    {
        public HeatContext(DbContextOptions<HeatContext> options) : base(options)
        {
        }

        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Knowledge> Knowledges { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attachment>(a =>
            {
                a.ToTable("FRS_Knowledge");
                a.Property(t => t.Title).HasColumnName("Title");
                a.Property(ft => ft.FileType).HasColumnName("AttachmentData_FileType");
            });
            modelBuilder.Entity<Knowledge>(k =>
            {
                k.ToTable("FRS_Knowledge");
                k.Property(t => t.Title).HasColumnName("Title");
                k.Property(ft => ft.FileType).HasColumnName("AttachmentData_FileType");
                k.HasOne<Attachment>().WithOne().HasForeignKey<Knowledge>(t => t._id);
            });
        }
    }
}

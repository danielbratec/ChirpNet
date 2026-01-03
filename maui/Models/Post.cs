namespace ChirpNet.Maui.Models;

public class Post
{
    public long Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public User Author { get; set; } = null!;
}

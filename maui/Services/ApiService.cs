using System.Net.Http.Json;
using ChirpNet.Maui.Models;

namespace ChirpNet.Maui.Services;

public class ApiService
{
    private readonly HttpClient _httpClient;
    private string? _token;

    public ApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        
        // Endereço importante:
        // Android Emulator → 10.0.2.2
        // Dispositivo físico na mesma rede → IP da máquina que roda o backend
        // Windows → localhost
        _httpClient.BaseAddress = new Uri("http://10.0.2.2:8080/api/");
    }

    public void SetToken(string? token)
    {
        _token = token;
        
        if (string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization = null;
        }
        else
        {
            _httpClient.DefaultRequestHeaders.Authorization = 
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }
    }

    public async Task<string?> LoginAsync(string username, string password)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("auth/login", new { username, password });
            
            if (!response.IsSuccessStatusCode)
                return null;

            var result = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            var token = result?["token"];

            if (token is not null)
                SetToken(token);

            return token;
        }
        catch
        {
            return null;
        }
    }

    public async Task<List<Post>?> GetPostsAsync()
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<List<Post>>("posts");
        }
        catch
        {
            return null;
        }
    }

    public async Task<bool> CreatePostAsync(string content)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("posts", new { content });
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
}

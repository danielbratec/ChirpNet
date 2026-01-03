using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ChirpNet.Maui.Models;
using ChirpNet.Maui.Services;

namespace ChirpNet.Maui.ViewModels;

public partial class TimelineViewModel : ObservableObject
{
    private readonly ApiService _apiService;

    [ObservableProperty]
    private List<Post> posts = new();

    [ObservableProperty]
    private string newPostContent = string.Empty;

    [ObservableProperty]
    private bool isBusy;

    public TimelineViewModel(ApiService apiService)
    {
        _apiService = apiService;
        _ = LoadPostsAsync(); // Carrega ao iniciar
    }

    [RelayCommand]
    private async Task LoadPostsAsync()
    {
        if (IsBusy) return;

        IsBusy = true;

        try
        {
            var result = await _apiService.GetPostsAsync();
            if (result is not null)
            {
                Posts = new List<Post>(result);
            }
        }
        finally
        {
            IsBusy = false;
        }
    }

    [RelayCommand]
    private async Task SendPostAsync()
    {
        if (string.IsNullOrWhiteSpace(NewPostContent)) return;

        IsBusy = true;

        try
        {
            var success = await _apiService.CreatePostAsync(NewPostContent.Trim());
            if (success)
            {
                NewPostContent = string.Empty;
                await LoadPostsAsync();
            }
        }
        finally
        {
            IsBusy = false;
        }
    }
}

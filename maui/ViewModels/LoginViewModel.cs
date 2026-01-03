using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ChirpNet.Maui.Services;

namespace ChirpNet.Maui.ViewModels;

public partial class LoginViewModel : ObservableObject
{
    private readonly ApiService _apiService;

    [ObservableProperty]
    private string username = string.Empty;

    [ObservableProperty]
    private string password = string.Empty;

    [ObservableProperty]
    private string errorMessage = string.Empty;

    [ObservableProperty]
    private bool isBusy;

    public LoginViewModel(ApiService apiService)
    {
        _apiService = apiService;
    }

    [RelayCommand]
    private async Task LoginAsync()
    {
        if (IsBusy) return;

        IsBusy = true;
        ErrorMessage = string.Empty;

        try
        {
            var token = await _apiService.LoginAsync(Username, Password);
            
            if (string.IsNullOrEmpty(token))
            {
                ErrorMessage = "Usuário ou senha inválidos";
                return;
            }

            // Navega para timeline
            await Shell.Current.GoToAsync("//TimelinePage");
        }
        finally
        {
            IsBusy = false;
        }
    }
}

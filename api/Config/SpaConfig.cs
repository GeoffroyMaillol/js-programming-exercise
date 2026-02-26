namespace UserDataApi.Config;

/// <summary>
/// Configuration for the Single Page Application, tied to the SpaConfig in appsettings.json. 
/// </summary>
public class SpaConfig
{
    public string[] HostUrls { get; set; } = Array.Empty<string>();
}
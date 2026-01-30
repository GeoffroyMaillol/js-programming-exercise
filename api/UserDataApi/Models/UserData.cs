namespace UserDataApi.Models;

/// <summary>
/// Defines a User data object.
/// </summary>
public record UserData
{
    public UserData() {}

    public UserData(string firstName, string lastName, string jobTitle, string phone, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        JobTitle = jobTitle;
        Phone = phone;
        Email = email;
    }

    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string JobTitle { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Email { get; set; } = "";
}


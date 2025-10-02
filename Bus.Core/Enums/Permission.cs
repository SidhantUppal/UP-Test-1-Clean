namespace Bus.Core.Enums
{
    /// <summary>
    /// System permissions enumeration
    /// Values correspond to PermissionID in V7.SystemPermission table
    /// </summary>
    public enum Permission
    {
        // Incident permissions
        INCIDENT_CREATE = 1,
        INCIDENT_VIEW = 2,
        INCIDENT_EDIT = 3,
        INCIDENT_DELETE = 4,
        INCIDENT_CLOSE = 5,
        INCIDENT_VIEW_STATS = 6,

        // Hazard permissions
        HAZARD_CREATE = 7,
        HAZARD_VIEW = 8,
        HAZARD_EDIT = 9,
        HAZARD_DELETE = 10,
        HAZARD_VIEW_STATS = 11
    }
}
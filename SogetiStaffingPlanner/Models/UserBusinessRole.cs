//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SogetiStaffingPlanner.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserBusinessRole
    {
        public int UserId { get; set; }
        public int BusinessRoleId { get; set; }
        public int LastModifiedUserId { get; set; }
        public System.DateTime LastModified { get; set; }
        public bool Active { get; set; }
    
        public virtual BusinessRole BusinessRole { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
        public virtual User User11 { get; set; }
    }
}

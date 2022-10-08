using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Personal_Details.Models
{
    public class PersonalDetails
    {
        public int PersonId { get; set; }
        public string PersonName { get; set; }
        public string PersonAddress { get; set; }
        public string DateOfBirth { get; set; }
        public string Sex { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string PhotoFileName { get; set; }
    }
}

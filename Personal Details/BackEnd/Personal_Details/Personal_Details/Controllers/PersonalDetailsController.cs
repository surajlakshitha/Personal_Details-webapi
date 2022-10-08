using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Personal_Details.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Personal_Details.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PersonalDetailsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select PersonId, PersonName, PersonAddress, 
                    convert(varchar(10),DateOfBirth,120) as DateOfBirth
                    , Sex, PhoneNumber, EmailAddress, PhotoFileName
                    from dbo.PersonalDetails
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PersonalDetailsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(PersonalDetails ped)
        {
            string query = @"
                    insert into dbo.PersonalDetails
                    (PersonName, PersonAddress, DateOfBirth, Sex, PhoneNumber, EmailAddress, PhotoFileName)
                    values 
                    (
                    '" + ped.PersonName + @"'
                    ,'" + ped.PersonAddress + @"'
                    ,'" + ped.DateOfBirth + @"'
                    ,'" + ped.Sex + @"'
                    ,'" + ped.PhoneNumber + @"'
                    ,'" + ped.EmailAddress + @"'
                    ,'" + ped.PhotoFileName + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PersonalDetailsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(PersonalDetails ped)
        {
            string query = @"
                    update dbo.PersonalDetails set 
                    PersonName = '" + ped.PersonName + @"'
                    ,PersonAddress = '" + ped.PersonAddress + @"'
                    ,DateOfBirth = '" + ped.DateOfBirth + @"'
                    ,Sex = '" + ped.Sex + @"'
                    ,PhoneNumber = '" + ped.PhoneNumber + @"'
                    ,EmailAddress = '" + ped.EmailAddress + @"'
                    where PersonId = " + ped.PersonId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PersonalDetailsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.PersonalDetails
                    where PersonId = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PersonalDetailsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllPersonalDetails")]
        public JsonResult GetAllPersonalDetails()
        {
            string query = @"
                    select PersonName from dbo.PersonalDetails
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PersonalDetailsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}

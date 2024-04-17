export const environment = {
    production      : false,
    apiUrl          : "http://localhost:3000/",
    apiAuthUrl      : "http://localhost:3000/",
    MenuArray : [
        {
          "id" : 1,
          "path" : "/userList",
          "name" : "User List",
          "roleaccessId" : 1
        },
        {
          "id" : 2,
          "path" : "/admin",
          "name" : "Admin List",
          "roleaccessId" : 1
        },
        {
          "id" : 3,
          "path" : "/teacher",
          "name" : "Teacher List",
          "roleaccessId" : 2
        },
        {
          "id" : 4,
          "path" : "/student",
          "name" : "Student List",
          "roleaccessId" : 2
        },
        {
          "id" : 5,
          "path" : "/excelUpload",
          "name" : "Upload Excel Data",
          "roleaccessId" : 2
        }
    ]
};

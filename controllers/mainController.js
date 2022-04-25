const db = require("../db");
const userController = require('./userController')

exports.fileUpload = (req, res) => {

    //handle no file upload
    if(!req.files) return res.status(400).send('No files were uploaded')

    const file = req.files.csv;
    const filename = file.name;

    console.log(file.mimetype)

    //UPDATE TO CSV MIMETYPE
    if (file.mimetype === 'application/vnd.ms-excel') {
        file.mv('./public/files/csv_files/' + filename, (err) => {
            if (err) {
                console.log(err);
                res.redirect('/')
                return res.status(500);
            }

            //insert into db
            var query = `INSERT INTO notes SET ?`
            console.log('user email is: ' + email)
            db.query(query, {csv_file: filename, user_id: userController.getUserIDfromEmail(email)}, function(err) {
                if (err) {
                    throw err;
                } else {
                    console.log(filename + ' successfully uploaded to database.')
                }
            });

            

            return res.redirect('/');
        });
    } else {
        res.send("Please upload CSV filetype");
    }
}
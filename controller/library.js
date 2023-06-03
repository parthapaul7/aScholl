const Library = require('../models/library'); 
const User = require('../models/user');

exports.getLibrary = async (req, res) => {
    try {
        const library = await Library.find({});
        res.status(200).json({ status : "success", data: library});
    } catch (err) {
        res.status(500).json({ err });
    }
}

exports.getOneLibrary = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id);
        res.status(200).json({ library });
    } catch (err) {
        res.status(500).json({ err });
    }
}

exports.postLibrary = async (req, res) => {
    try {
        const library = await Library.create(req.body);
        res.status(200).json({ library });
    } catch (err) {
        res.status(500).json({ err });
    }
}

exports.issueBook = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id);

        if (library.quantity <= 0) {
                return res.status(400).json({ msg: "No book left" });
        } else {
            const issuedBook = library.issued.find(book => (book.issued_to == req.body.issued_to && book.status == "Issued"));
            if (issuedBook) {
                return res.status(400).json({ msg: "Book is already issued to the user" });
            }
            const data = {
                issued_to : req.body.issued_to,
                issued_on : req.body.issued_on,
                due_date :req.body.due_date,
                status : "Issued"
            }

            library.quantity = library.quantity - 1

            console.log(data.quantity, library.quantity);

            library.issued.push(...library.issued,data);

            console.log("issued books",library.issued);

            if(library.quantity <= 0){
                library.status = "Not Available";
            }

            await library.save();

            return res.status(200).json({ library });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.returnBook = async (req, res) => {
    try{
        const library = await Library.findById(req.params.id);
        if (library.quantity <= 0) {
            return res.status(400).json({ msg: "Book not issued" });
        }
        else {
            // check if books are issed to the user
            const issuedBook = library.issued.find(book => (book.issued_to == req.body.issued_to && book.status == "Issued"));
            if (!issuedBook) {
                return res.status(400).json({ msg: "Book not issued to the user" });
            }


            issuedBook.returned_on = req.body.returned_on;
            issuedBook.fine = req.body.fine;
            issuedBook.status = "Returned";

            // update the quantity of the book
           const data = [
                ...library.issued.filter(book => (book.issued_to != req.body.issued_to && book.status == "Issued")),
                issuedBook
           ] 

           console.log(...library.issued.filter(book => (book.issued_to != req.body.issued_to && book.status != "Issued"))),
        //    console.log(library.issued);
           library.issued = data;
           library.quantity = library.quantity + 1;
            await library.save();
            return res.status(200).json({ library });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.deleteLibrary = async (req, res) => {
    try{
        const library = await Library.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Book deleted" });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}
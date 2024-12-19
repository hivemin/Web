const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const  webpageModel = require("../models/nosql/webpage")
const commerceModel = require("../models/nosql/commerce");


const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        return res.send(await webpageModel.findById(id)); // Busca y envía el elemento del modelo con el id especificado.
    }
    catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_GET_WEBPAGE', 404);
    }
}
const getItems = async (req, res) => {
    try {

        let query = commerceModel.find();
        // console.log(req.user.role);
        if (req.user.role !== 'admin') {
            console.log(req.user.role);
            // Excluir el campo CIF para usuarios que no son admin
            query = query.select('-cif -_id -rol -deleted -password');
        }
        const data = await query.exec();
        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404);
    }
};

const createComment = async (req, res) => {
    try {
        email = req.user.email
        req = matchedData(req)
        const comment = {
            text: req.text,
            email_user: email,
            score: req.score
        }
        const webPage = await webpageModel.findById(
            req.id
        )
        // console.log(webPage)
        num_puntuaciones = webPage.comments.length
        let newScore
        // console.log(webPage)
        if(num_puntuaciones != 0){
            newScore = ((webPage.scoring * num_puntuaciones) + req.score) / (num_puntuaciones+1)
            // console.log(newScore)
        }
        else{
            newScore = req.score
        }
        // console.log(newScore)
        await webpageModel.findByIdAndUpdate(req.id, { $push: { comments: comment }, scoring: newScore })

        res.send()

    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_COMMENT")
    }
}
const createWebpage = async (req, res) => {
    try {
        const user = req.user

        var body = matchedData(req)
        body.cif=user.cif
        const data = await webpageModel.create(body)

        res.send(data)

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_WEBPAGE")
    }
}

const updateWebpage = async (req, res) => {
    try {
        const cif = req.jwt.cif;
        const body = matchedData(req)

        const data = await webpageModel.findOneAndUpdate({ cif: cif }, body);
        if (!data) {
            return handleHttpError(res, 'NOT_PERMISSION', 403);
        }
        res.send(data)

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_WEBPAGE")
    }
}
const deleteWebpage = async (req, res) => {
    try {
        const { id } = matchedData(req);
        let result;
        result = await webpageModel.findByIdAndDelete(id);
        res.send(result);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_DELETE_WEBPAGE');
    }
}
const uploadImage = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const {file} = req;
        const updatedWebpage = await webpageModel.findOneAndUpdate({id}, {image: file.filename}, {new: true});
        if (!updatedWebpage) {
            return handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404);
        }
        res.send(updatedWebpage);
    }
    catch (err) {
        handleHttpError(res, 'ERROR_UPLOAD_IMAGE');
    }
}

const getCity = async (req, res) => {
    try {
        const { city, scoring } = matchedData(req);
        let queryOptions = { city: city };

        if (scoring) {
            // Use the sort method from Mongoose directly in the query
            var data = await webpageModel.find(queryOptions).sort({ scoring: -1 });
        } else {
            var data = await webpageModel.find(queryOptions);
        }

        res.send(data);
    } catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_GET_WEBPAGE_BY_CITY");
    }
}

const getCityAndActivity = async (req, res) => {
    try {
        const {city, activity, scoring} = matchedData(req)
        let data
        if(!scoring){
            data = await webpageModel.find({
                city: city,
                activity: activity
            })
        }
        else{
            data = await webpageModel.find({
                city: city,
                activity: activity
            }).sort({ scoring: -1 });
        }
        res.send(data)
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_WEBPAGE_BY_CITY_AND_ACTIVITY")
    }
}

const addUser = async (req, res) => {
    try {
        const user ={
            mail: req.user.email  // Email del usuario obtenido desde el objeto de la sesión
        }
        // const { id } = matchedData(req.params);
        const id= req.params.id
        console.log(id)
        // Realizar la actualización utilizando `findByIdAndUpdate` para añadir el email al campo usuarios
        // await paginaModel.findByIdAndUpdate(id, { $push: { usuarios: user } })

        const data = await paginaModel.findByIdAndUpdate(
            id,
            { $push: { usuarios: user } },  // Utiliza $push para añadir el email al array de usuarios
            { new: true }  // Opción para retornar el documento actualizado
        );

        // Enviar el documento actualizado como respuesta
        res.send();

    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_ADD_USER");
    }
}

const getUsers = async (req, res) => {
    try {
        console.log("aaaaaaaaaa")


    } catch (err) {
        console.error(err);
        handleHttpError(res, "ERROR_GET_USERS_OF_PAGE");
    }
};




module.exports = {getItem, getItems, createComment, createWebpage, updateWebpage, deleteWebpage, uploadImage, getCity, getCityAndActivity, addUser, getUsers}


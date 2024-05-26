const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const  webpageModel = require("../models/nosql/webpage")


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
        return res.send(await webpageModel.find({})); // Busca y envía todos los elementos del modelo.
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
        cif = req.user.cif
        const { id, ...body } = matchedData(req)

        const page = await webpageModel.findById(id);

        if (page.cif != cif) {
            handleHttpError(res, "ERROR_NOT_PROPERTY")
            return
        }

        const data = await webpageModel.findByIdAndUpdate(id, body, { new: true });


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
        const { ciudad, scoring } = matchedData(req);
        let queryOptions = { ciudad: ciudad };

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




module.exports = {getItem, getItems, createComment, createWebpage, updateWebpage, deleteWebpage, uploadImage, getCity, getCityAndActivity}


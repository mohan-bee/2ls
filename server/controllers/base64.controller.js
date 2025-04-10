const base64Encode = async(req,res) => {
    try {
        const {query} = req.body
        if(!query){
            return res.status(404).json({success: false, msg: "Query Not Provided"})
        }
        const result = Buffer.from(query).toString("base64")
        return res.status(200).json({success: true, msg: "Encoded Successfully", result})
    } catch (error) {
        return res.status(500).json({success: false, msg: "Internal Server Error", desc: error.message})
    }
}

const base64Decode = async(req,res) => {
    try {
        const {query} = req.body
        if(!query){
            return res.status(404).json({success: false, msg: "Query Not Provided"})
        }
        const result = Buffer.from(query, "base64").toString("utf-8")
        return res.status(200).json({success: true, msg: "Decoded Successfully", result})
    } catch (error) {
        return res.status(500).json({success: false, msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = {base64Encode, base64Decode}
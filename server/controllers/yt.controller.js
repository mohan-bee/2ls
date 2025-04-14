const ytdl = require('ytdl-core')

const downloadYT = async (req,res) => {
    try {
        const {url, quality} = req.query
        console.log(url)
        if(!ytdl.validateURL(url)){
            return res.status(500).json({success: false, msg: "Invalid Youtube Link",})
        }
        const info = await ytdl.getInfo(url)
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '')

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`)
        ytdl(url, {
            quality: 'highest',
            filter: 'audioandvideo',
        }).pipe(res)
    } catch (error) {
        return res.status(500).json({success: false, msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = downloadYT
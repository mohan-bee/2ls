const  { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

async function main(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `give me the time and space complexity for this code in this format ["O(N)", "O(N)"] having the [Time complexity, space complexity]: ${code}`,
  });
 return response.text;
}

const a = main('a linear for loop');


const getTimeSpace = async (req,res) => {
    try {
        const {code} = req.body
    if(!code){
        return res.status(400).json({msg: "Error in Getting Code !"})
    }
    response = await main(code)
    return res.status(200).json({response})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getTimeSpace
import OpenAI from "openai";

const token = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: token,
});

export const generateTaskTemplate = async (property_detail_string: string) => {
  const prompt = `
    You are an expert housing complex property manager, and need to generate a list of the most important maintenance items that happen on a 1 month to every 5 year basis. 
    Generate 20-25 tasks (prioritize the best or most applicable tasks over number of tasks). 
    You will generate the fields for each task item using the json format listed below. 
    You will generate this list based on informed decisions for the provided input (sq ft, heating and AC type, roofing and interior/exterior wall type, yard size and any additional features provided).
    Think about each to do item before generating the entire list to make sure to prioritize the most important tasks. If data from the input is missing, do not generate tasks regarding this item. 
    Only list the name of the task, not any reasoning for why the task is required or what it will accomplish.
    
    <property details>
    ${property_detail_string}
    </property details>
    
     <output format>
     as a json array of objects, stringify the output.
     Do not include any other text or formatting such as markdown tags
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        frequency: {
          value: {
            type: Number,
            required: true,
            min: 1,
          },
          unit: {
            type: String,
            enum: ["days", "weeks", "months", "years"],
            required: true,
          },
        },
        estimatedDuration: {
          type: Number,
          required: true,
          min: 1, // in minutes
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          required: true,
        },
        category: {
          type: String,
          required: true,
          trim: true,
        },
      }
    </output format>
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content ?? "{}";
};

import messages from "@/utils/messages";

export default (code) => {
    console.log(messages[code || "ServerError"]);
    return messages[code || "ServerError"];
}
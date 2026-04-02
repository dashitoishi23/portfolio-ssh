function getContent() {
  return `Projects I have built when not touching grass:
  
  • Photo Library AMA: Building on my home server successfully hosting all my photos, I built a RAG pipeline that retreived
context based on metadata from all my photos to answer questions about my photo library. At a high level, leveraged BLIP to
extract captions for each photo, and along with EXIF data stored everything as embedded vectors in a ChromaDB vector
database. Then, built a Node.js server that took in user queries, retreived relevant context from the vector database and used
it to answer questions about my photo library. For the LLM part, I am running a vLLM instance on my home server which
serves the Llama-3.1-8B-Instruct (Q4 quantization) model to answer queries based on the aforementioned context.

Tech: RAG, BLIP, vLLM, ChromaDB, Node.js, Express, Vector Databases

• Accountify: A no-internet, local-only personal expense management app that helps the user budget their earnings as per the
50-30-20 rule, wherein the rule itself is adjustable. App includes expense history, editing a past expense and deleting a past
expense. Leveraged React Native for cross-platform availability. Has organically scaled to 50+ downloads thus far
Link: https://play.google.com/store/apps/details?id=com.accountify

Tech: React Native, Kotlin, SQLite

• Home Server: Converted my gaming PC into a personal home server via a WSL2 instance running inside a Windows 10
installation. Salient features include replacing my Google One annual subscription for cloud storage with a self-hosted open
source alternative called Immich. The PC also hosts this very portfolio website. Used ufw extensively to manage open ports for
incoming traffic. Leveraged my knowledge of networking, managing storages and process management using Docker to run
important services that support my home server.

Tech: Docker, WSL2, Linux, Networking, Storage Management

• Zappr: A no-code Backend-as-a-Service tool to spin up server logic with fundamental auth endpoints and logic out of the box.
In addition, the tool packages endpoints to execute CRUD operations on customized business entities for seamless use-case
adoption. The tool comes packaged as a ready-to-deploy solution, utilizing just one single Docker command for deployment on
any server
Tech: Go, MongoDB, Docker`;
}

module.exports = { getContent };

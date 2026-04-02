function getContent() {
  return `Hello world! This is Hitoishi Das coming straight at you from this ssh server hosted on a PC hosted by me. 
  I am a software engineer by trade with about ${getElapsedTime('2020-08-01')} of experience. I have had experience with building mission-critical software used by customers across the globe, crucial healthcare
  applications that are responsible for saving lives and in general building tech that is scalable, reliable and trust-worthy. If you ever need a specialist in tech, better call Hitoishi
  
  My skills include, but are not limited to:
  Programming languages: JavaScript, TypeScript, Go, C#, C++, Python, Java, Data Structures, Algorithms
  Frameworks and libraries: Node.js, Express, React, Angular, webpack, .NET Core
  Databases: MongoDB, MySQL, PostgreSQL, SQLite
  Cloud/Deployment: AWS, Azure, GCP, Docker, Kubernetes, Helm Charts, Flux
  GenAI: RAG, Vector Databases (ChromaDB, FAISS, pgvector), LoRA, Model Context Protocol (MCP), A2A Protocol, Model Quantization, LangChain

  Know more about me here: https://hitoishidas.com
  `;

}

function getElapsedTime(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
}

module.exports = { getContent };

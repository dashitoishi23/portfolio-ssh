function getContent() {
  return `Here is an exhaustive summary of my experience thus far:
  
NielsenIQ (Pune, India | April 2024- Present)
Software Engineer 
◦ Responsible for building a product that caters to 700 customers daily.
◦ Spearheaded an upsell campaign in our flagship product that resulted in almost an increase in our MRR USD 4
million across all geographical regions
◦ Architechted and built an API-key based authentication mechanism for inter-service communication by
leveraging Hashicorp Vault and Kubernetes Volume Mounts to automatically rotate keys, and re-concile
them via Flux. My architecture eliminated the need to use environment variables altogether
◦ Built a microservice for a cross-functional team that scaled to almost 400 requests per second with an
average latency of around 272 ms
◦ Worked with the team working on the proprietary AI-powered chatbot, used by our customers to receive
context-aware information regarding their respective subscriptions to our services. Utilised retrieval
mechanisms like RAG and then leveraged context engineering to power the chatbot

Tech Stack: .NET Core, React, Angular, PostgreSQL, AWS, JavaScript, TypeScript, HTMX,
Python, RAG, Context Engineering, vector databases

• Tricog Health
Senior Software Engineer (Bengaluru, India | January 2023- April 2024)
◦ Built and led the development of an authentication tool for our products using Node.js, React, MySQL and
AWS. Bench marked it to handle 45,000 requests from 200 concurrent users with a peak memory usage of
352 MB.
◦ Built and scaled an in-house notifications microservice, being used in production by our products. Built it to
be scalable, available and fault tolerant using Node.js and TypeScript, and utilized Docker and
Kubernetes to make it horizontally scalable. Reduced development time for products that sent notifications
by almost 25 percent. Bench marked it to handle 50,000 requests from 200 concurrent users with a peak
memory usage of 474 MB. Leveraged a bare-bones MQTT queue system to scale the setup even further

Tech Stack: Node.js, .NET Core, React, Angular, MySQL, AWS, JavaScript, TypeScript

• Tezo
Software Engineer (Hyderabad, India | August 2020- December 2022)
◦ Led and developed an in-house low code backend which was self deployable and provided role-based
authentication, external OAuth authentication, static storage, CRUD endpoints for
application-specific data and SSL certificate generation using LetsEncrypt out of the box. The entire
back-end could be started by simply running a Docker file which in turn fires up the microservices.
◦ Successfully introduced Go into our organisation’s tech ecosystem and validated the advantages of Go in niche
use cases
◦ Massively reduced time taken to develop backends for different solutions for the organisation’s clients
◦ Managed a team of 3 junior developers. Helped the organization deliver solutions to 3 different clients using the
same.
Tech Stack: Go, Microsoft Azure, Docker

• Tezo
Software Engineer Intern (Hyderabad, India | January 2020- July 2020)
◦ Built a no-code platform for our QA team that automated the entire testing performance for them, tailor-made
to cater to their needs to test our proprietary products that we offer to our clients.
Tech Stack: Node.js, .NET Core, React, MySQL, AWS, JavaScript, TypeScrip`;
}

module.exports = { getContent };

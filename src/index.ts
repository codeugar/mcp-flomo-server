import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 尝试多种方式加载环境变量
dotenv.config({ path: '.env.local' });
dotenv.config({ path: join(process.cwd(), '.env.local') });
dotenv.config({ path: join(__dirname, '../.env.local') });

let flomo_api = "https://flomoapp.com/iwh/MTUyMTE2OQ/4beefdec52b9c0ac51795d9bfe4cb185/"
const url = flomo_api;

// Create server instance
const server = new McpServer({
    name: "flomo",
    version: "1.0.0",
});

async function makeRequest<T>(url: string, request: any): Promise<T | null>{
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    try{
        
        
        const response = await fetch(url, {
            headers, 
            method: "POST", 
            body: JSON.stringify(request)
        });
        
        
        if(!response.ok){
            throw new Error(`Http error: ${response.status} ${response.statusText}`);
        }
        
        const responseData = await response.json();
        
        return responseData as T;
    } catch (error) {
        console.error("Error making request:", error);
        return null;
    }
}


interface flomoRequest {
    content: string;
}

interface flomoResponse {
    code?: number;
    message?: string;
    memo?:{
        creator_id?: number,
        source?: string,
        content?: string,
        tags?: string[],
        created_at?: string,
        updated_at?: string,
        linked_memos?: string[],
        linked_count?: number,
        slug?: string,
    }
}

function formatFlomoResponse(response: flomoResponse) {
    const {code, message} = response;
    if(code !== 0) {
        throw new Error(`Flomo API returned error: ${message}`);
    }
    return {
        content: [{
            type: "text" as const,
            text: `message: ${message}`
        }]
    };
}

server.tool("flomo", 
    "记录到flomo", 
    {content: z.string()},
    async ({content}) => {
        
        if (!content || content.trim() === '') {
            console.error('收到空内容');
            return {
                content: [{
                    type: "text" as const,
                    text: "内容不能为空"
                }]
            };
        }
        
        const request: flomoRequest = {
            content: content
        };
        console.error(`请求内容: ${JSON.stringify(request)}`);
        
        const requestBody = JSON.stringify(request);
        console.error(`请求体: ${requestBody}`);
        
        const response = await makeRequest<flomoResponse>(`${url}`, request);
        console.error(`响应: ${JSON.stringify(response)}`);
        
        if(response === null){
            return {
                content: [{
                    type: "text" as const,
                    text: "记录失败"
                }]
            };
        }
        return formatFlomoResponse(response);
    }
);


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather server is running. Press Ctrl+C to stop.");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });

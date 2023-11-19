import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>API v2.0.0</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          
          .container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          
          .title {
            font-size: 36px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Adding blur effect */
            color: #566573;
          }
          
          .subtitle {
            font-size: 24px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">API v2.0.0</h1>
        </div>
      </body>
      </html>
    `;
  }
}

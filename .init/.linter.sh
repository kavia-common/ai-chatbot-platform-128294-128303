#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-chatbot-platform-128294-128303/chatbt_page_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


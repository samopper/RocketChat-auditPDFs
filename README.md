# rocketchat-dbexportsort
Takes exports of rocketchat's messages and rooms collections and creates readable pdfs for every room in the server including direct messages.

Step 1:
Export rocketchat_room and rocketchat_message collections from rocketchat mongodb  with mongodb compass as  rooms.json and messages.json

Step2:
Fix formatting of json files. add brackets at first and last char of the files and add commas at each new line. You can use VSCode's regex find and replace to find ^ and replace with , then change the first and last , to a open and close bracket. "[]"

Step3:
npm install and node index. Pdfs should appear in the pdfs folder. if the pdfs folder does not exist create one before running node index.

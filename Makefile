SHELL = bash

.PHONY: server
server:
	cd backend && npm install && node api/index.js

.PHONY: client
client:
	cd frontend && npm install && npm start	

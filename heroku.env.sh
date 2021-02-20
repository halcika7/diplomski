#!/bin/bash
heroku config:set $(cat .env.production | sed '/^$/d; /#[[:print:]]*$/d')
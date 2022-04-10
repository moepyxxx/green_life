#!/bin/sh

for i in 'posts' 'users' 'greens' 'tags' 'oyuzuris' 'messages'
do
  mongoimport --db greenlife --collection ${i} --authenticationDatabase admin --username root --password example --drop --file ./${i}.json --jsonArray
done

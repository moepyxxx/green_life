#!/bin/sh

for i in 'posts'
do
  mongoimport --db greenlife --collection ${i} --authenticationDatabase admin --username root --password example --drop --file ./${i}.json --jsonArray
done

#!/bin/bash

for file in $(find . -name '*.js'); do 
    mv "$file" "${file/-webcomponent.js/-webcomponent.js}"
done
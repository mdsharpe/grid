cd ./src/web

if [ ! -d ./node_modules ]; then
    mkdir ./node_modules
fi

sudo chown vscode node_modules

npm i

cd ../..

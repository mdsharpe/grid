echo 'source <(ng completion script)' >> ~/.bashrc

cd ./src/web
sudo chown node node_modules
npm i
cd ../..

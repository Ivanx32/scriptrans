set -e
EMSDK_VERSION=3.1.60
if [ ! -d emsdk ]; then
  git clone https://github.com/emscripten-core/emsdk.git
fi
cd emsdk
./emsdk install $EMSDK_VERSION
./emsdk activate $EMSDK_VERSION
source ./emsdk_env.sh

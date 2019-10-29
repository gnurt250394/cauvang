#!/usr/bin/env bash
#
# Removes the latest version of CocoaPods  which may have lack of backward compatibilities
# Installs version 1.5.3 which has no compatibility issues
# 1.5.3 can be changed to another version you'd prefer

# echo running install node8
# set -ex
# brew uninstall node@6
# NODE_VERSION="8.9.4"
# curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
# sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# echo running post-clone scripts
# echo uninstalling all cocoapods versions
# sudo gem uninstall cocoapods -ax
# echo installing cocoapods version 1.8.4
# sudo gem install cocoapods -v 1.8.4
#!/usr/bin/env bash


#This should match what's in Podfile.lock for COCOAPODS:
# COCOAPODS_VER=1.7.5

# echo "POST-CLONE: Installing CocoaPods version $COCOAPODS_VER"

# sudo gem install cocoapods -v $COCOAPODS_VER

# echo "POST-CLONE: Finished installing CocoaPods version $COCOAPODS_VER"

# pod cache clean --all

# echo "POST-CLONE: finished pod cache clean --all"

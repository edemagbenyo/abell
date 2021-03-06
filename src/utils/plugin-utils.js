const path = require('path');

/**
 *
 * @param {ProgramInfo} programInfo
 */
async function executeBeforeBuildPlugins(programInfo) {
  /** Before Build plugins */
  for (const pluginPath of programInfo.abellConfigs.plugins) {
    const currentPlugin = require(pluginPath);
    if (currentPlugin.beforeBuild) {
      console.log(
        '>> Plugin BeforeBuild: Executing ' +
          path.relative(process.cwd(), pluginPath)
      );

      await currentPlugin.beforeBuild(programInfo);
    }
  }
}

/**
 *
 * @param {ProgramInfo} programInfo
 */
function executeAfterBuildPlugins(programInfo) {
  /** After Build plugins */
  for (const pluginPath of programInfo.abellConfigs.plugins) {
    const currentPlugin = require(pluginPath);
    if (currentPlugin.afterBuild) {
      if (programInfo.logs === 'complete') {
        console.log(
          '>> Plugin AfterBuild: Executing ' +
            path.relative(process.cwd(), pluginPath)
        );
      }
      currentPlugin.afterBuild(programInfo);
    }
  }
}

module.exports = { executeAfterBuildPlugins, executeBeforeBuildPlugins };

<template>
  <header style="background: #fff!important;">
    <n3-container fluid style="width:92%;">
      <n3-nav theme="default">
        <n3-nav-item active>
          <a href="/"><strong>LevelMng</strong></a>
        </n3-nav-item>
        <n3-nav-item>
          <n3-sub-nav>
            <a slot="title">Console</a>
            <n3-nav-item>
              <a href="/database">Database</a>
            </n3-nav-item>
            <n3-nav-item>
              <a>API</a>
            </n3-nav-item>
          </n3-sub-nav>
        </n3-nav-item>
      </n3-nav>
    </n3-container>
  </header>
  <n3-container id="level-container">
    <div id="app">
      <img src="./assets/logo.svg">
      <h1>LevelUP(LevelDB) + Express + Vue + N3-component</h1>
      <h4>(On Github)</h4>
    </div>

  </n3-container>
</template>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#level-container{
  background: #fff;
  width: 92%!important;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #ddd;
  margin: 20px auto;
  padding-bottom: 20px;
}


</style>

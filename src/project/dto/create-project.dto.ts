export class CreateProjectDto {
  // 项目的英文名字（或者说仓库名字
  name: string;
  // 项目的中文名字（正式名字
  title: string;
  intro: string;
  // 封面图片
  coverUrl: string;
  // 目录结构
  tree: string;
  // 仓库地址
  repositoryUrl: string;
  //项目部署地址
  displayUrl: string;
  // 项目使用的包
  package: string;
  // 项目用到的技术
  skills: string;
}

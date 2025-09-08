export function formatReleaseYear(date: string): string {
  const year = new Date(date).getFullYear()
  return year ? year.toString() : ''
}

export const formatGenres: Record<string, string> = {
  动作: '動作',
  冒险: '冒險',
  动画: '動畫',
  喜剧: '喜劇',
  犯罪: '犯罪',
  纪录: '紀錄',
  剧情: '劇情',
  家庭: '家庭',
  奇幻: '奇幻',
  历史: '歷史',
  恐怖: '恐怖',
  音乐: '音樂',
  悬疑: '懸疑',
  爱情: '愛情',
  科幻: '科幻',
  电视电影: '電視電影',
  惊悚: '驚悚',
  战争: '戰爭',
  西部: '西部'
}

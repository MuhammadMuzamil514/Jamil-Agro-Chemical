export const defaultMonthSeasonMap = {
  1: 'winter',
  2: 'winter',
  3: 'spring',
  4: 'spring',
  5: 'summer',
  6: 'summer',
  7: 'monsoon',
  8: 'monsoon',
  9: 'monsoon',
  10: 'autumn',
  11: 'autumn',
  12: 'winter',
}

export function getCurrentSeasonKey(monthSeasonMap = defaultMonthSeasonMap, now = new Date()) {
  const month = now.getMonth() + 1
  return monthSeasonMap?.[month] || defaultMonthSeasonMap[month] || 'winter'
}

export function getSeasonStartMonths(monthSeasonMap = defaultMonthSeasonMap) {
  const starts = {}
  const map = monthSeasonMap || defaultMonthSeasonMap

  for (let month = 1; month <= 12; month += 1) {
    const currentSeason = map[month] || defaultMonthSeasonMap[month]
    const previousMonth = month === 1 ? 12 : month - 1
    const previousSeason = map[previousMonth] || defaultMonthSeasonMap[previousMonth]

    if (currentSeason !== previousSeason && starts[currentSeason] == null) {
      starts[currentSeason] = month
    }
  }

  return starts
}

export function getSeasonStartMonthForKey(seasonKey, monthSeasonMap = defaultMonthSeasonMap) {
  const starts = getSeasonStartMonths(monthSeasonMap)
  return starts[seasonKey] || null
}

export function isSeasonKickoffWindow(monthSeasonMap = defaultMonthSeasonMap, now = new Date(), windowDays = 7) {
  const currentSeason = getCurrentSeasonKey(monthSeasonMap, now)
  const startMonth = getSeasonStartMonthForKey(currentSeason, monthSeasonMap)
  const currentMonth = now.getMonth() + 1
  const day = now.getDate()

  if (!startMonth) {
    return false
  }

  return currentMonth === startMonth && day <= windowDays
}

export function getSeasonLabel(seasonKey) {
  const labels = {
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    monsoon: 'Monsoon',
    autumn: 'Autumn',
  }

  return labels[seasonKey] || 'Season'
}

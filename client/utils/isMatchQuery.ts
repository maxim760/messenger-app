type IsMatchQueryProps = {
  query: string,
  match: string
}

export const isMatchQuery: (arg: IsMatchQueryProps) => boolean = ({ query, match }) => {
  const regex = new RegExp(query.trim().split(/\s+/).join(" "), "ig");
  return regex.test(match)
}
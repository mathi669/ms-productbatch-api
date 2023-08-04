interface TopicI {

  publish: (data: any,dercoHeaders: any) => Promise<void>
  receive(): Promise<void | never>;
}

export default TopicI

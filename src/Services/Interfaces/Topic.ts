interface TopicI {

  receive(): Promise<void | never>;
}

export default TopicI

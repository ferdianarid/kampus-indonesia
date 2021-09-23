import univList from "@request/univlist.json";

export default function handler(req, res) {
    res.json(univList);
}

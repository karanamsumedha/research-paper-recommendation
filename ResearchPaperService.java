import java.util.List;
import java.util.ArrayList;

public class ResearchPaperService {

    private List<ResearchPaper> papers;

    public ResearchPaperService() {
        this.papers = new ArrayList<>();
    }

    public void addPaper(ResearchPaper paper) {
        papers.add(paper);
    }

    public List<ResearchPaper> searchPapers(String query) {
        List<ResearchPaper> results = new ArrayList<>();
        for (ResearchPaper paper : papers) {
            if (paper.getTitle().contains(query) || paper.getAbstract().contains(query)) {
                results.add(paper);
            }
        }
        return results;
    }

    public List<ResearchPaper> filterPapers(String author, String year) {
        List<ResearchPaper> results = new ArrayList<>();
        for (ResearchPaper paper : papers) {
            if ((author == null || paper.getAuthors().contains(author)) && 
                (year == null || paper.getYear().equals(year))) {
                results.add(paper);
            }
        }
        return results;
    }

    public void removePaper(ResearchPaper paper) {
        papers.remove(paper);
    }

    public List<ResearchPaper> getAllPapers() {
        return papers;
    }
}
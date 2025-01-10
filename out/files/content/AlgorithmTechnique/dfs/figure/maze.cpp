#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1000;
int n;
string maze[MAXN + 2];

using pii = pair<int, int>;
pii dir[4] = {pii(-1, 0), pii(1, 0), pii(0, -1), pii(0, 1)};
string dir_char = "UDLR";
string cur; // 表示目前走法的字串

// vst[x][y]= (x,y) 是不是在路線上
bool vst[MAXN + 2][MAXN + 2];
void dfs(int x, int y) {
    vst[x][y] = true;
    // 現在要走第 i 種方向
    for (int i = 0; i < 4; i++) {
        int nx = x + dir[i].first, ny = y + dir[i].second;
        // 不要走進障礙物
        if (maze[nx][ny] == '#') continue;
        // 不要走到已經在路線上的格子
        if (vst[nx][ny]) continue;
        cur += dir_char[i];
        cout << "\\draw[color=red, line width=1mm, line cap=round]" << '(' << x << "," << y << ')' << " -- " << '(' << nx << ',' << ny << ')' << ";\n";
        dfs(nx, ny);
        cur.pop_back(); // 要記得拔掉
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n;
    // 直接在外面多加一圈障礙物防止走出去

    for (int i = 1; i <= n; i++) {
        cin >> maze[i];
        maze[i] = '#' + maze[i] + '#';
        for (int j = 1; j <= n; j++) {
            if (maze[i][j] == '#') {
                cout << "\\draw[fill=black!50!gray, draw=none] (" << i - 0.5 << "," << j-0.5 << ") rectangle ++ (1,1);\n";
                //cout << "\\draw[fill=black!60!gray, draw=none] (" << i - 0.37 << "," << j-0.37 << ") rectangle ++ (0.74,0.74);\n";
            }
            else {
                cout << "\\draw[fill=yellow!20!white, draw=none] (" << i - 0.37 << "," << j-0.37 << ") rectangle ++ (0.74,0.74);\n";
            }
        }
    }

    cout << "\\foreach \\x in {0,...," << n << "} {\n\\draw[very thick, brown] (\\x + 0.5, 0.5) -- (\\x + 0.5, 10.5);\\draw[very thick, brown] (0.5, \\x + 0.5) -- (10.5, \\x + 0.5);\n}\n";

    maze[0] = maze[n + 1] = string(n + 2, '#');

    dfs(1, 1);

}
/*

10
..........
.#.....#..
.#..##...#
..##..#...
.......#..
##..#.....
..#....###
..........
.##...#...
......#...

*/

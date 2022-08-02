package com.ssafy.db.entity.depart;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	private String s;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="post_id")
	private Long postId;
	
	@Lob
	@Column(name="post_content")
	private String postContent;
	
	@Column(name="post_reg_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date postRegDate;
	
	@Column(name="post_upd_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date postUpdDate;
	
	@Column(name="post_ano_info")
	private boolean postAnoInfo;
	
	@Column(name="post_com_ban_info")
	private boolean postComBanInfo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id")
	private Category category;
	
	@OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<File> files = new ArrayList<>();
	
	@OneToMany(mappedBy = "post")
    private List<UserPostMention> userpostmentions = new ArrayList<>();
	
	@OneToMany(mappedBy = "post")
	private List<UserPostLike> userpostlikes = new ArrayList<>();
	
	public void setUser(User user) {
		this.user = user;
		user.getPosts().add(this);
	}
	
	public void setCategory(Category category) {
		this.category = category;
		category.getPosts().add(this);
	}
	
	
}
